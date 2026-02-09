package com.new_cafe.app.backend.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.new_cafe.app.backend.entity.Category;

@Repository
public class NewCategoryRepository implements CategoryRepository {

    @Autowired
    DataSource dataSource;

    // 카테고리별 기본 아이콘 매핑
    private static final java.util.Map<String, String> DEFAULT_ICONS = java.util.Map.of(
            "커피", "☕",
            "논커피", "🧋",
            "샌드위치", "🥪",
            "디저트", "🍰",
            "음료", "🥤",
            "베이커리", "🥐",
            "스무디", "🍹",
            "차", "🍵");

    @Override
    public List<Category> findAll() {
        List<Category> list = new ArrayList<>();
        String sql = "SELECT * FROM categories ORDER BY sort_order ASC";

        try (Connection conn = dataSource.getConnection();
                // 2. 실행
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(sql)) {
            // 3. 결과
            while (rs.next()) {
                String name = rs.getString("name");
                String icon = null;

                // icon 컬럼이 있으면 가져오기
                try {
                    icon = rs.getString("icon");
                } catch (SQLException e) {
                    // icon 컬럼이 없는 경우 무시
                }

                // icon이 없으면 기본 아이콘 사용
                if (icon == null || icon.isEmpty()) {
                    icon = DEFAULT_ICONS.getOrDefault(name, "📋");
                }

                Category category = Category.builder()
                        .id(rs.getString("id"))
                        .name(name)
                        .icon(icon)
                        .sortOrder(rs.getInt("sort_order"))
                        .build();
                list.add(category);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return list;
    }

    @Override
    public int save(Category category) {
        String sql = "INSERT INTO categories (name) VALUES (?)";
        try (Connection conn = dataSource.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, category.getName());
            return pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }
}
