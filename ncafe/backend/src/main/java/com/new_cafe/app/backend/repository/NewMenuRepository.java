package com.new_cafe.app.backend.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.new_cafe.app.backend.entity.Category;
import com.new_cafe.app.backend.entity.Menu;

@Repository
public class NewMenuRepository implements MenuRepository {

    @Autowired
    DataSource dataSource;

    @Override
    public List<Menu> findAll() {
        return findAllByName("");
    }

    @Override
    public List<Menu> findAllByName(String name) {
        List<Menu> list = new ArrayList<>();
        String sql = "SELECT m.*, c.name as category_name FROM menus m LEFT JOIN categories c ON m.category_id = c.id WHERE m.kor_name LIKE ?";

        try (Connection conn = dataSource.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, "%" + name + "%");

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    list.add(mapRowToMenu(rs));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return list;
    }

    @Override
    public List<Menu> findAllByCategoryId(Integer categoryId) {
        List<Menu> list = new ArrayList<>();
        String sql = "SELECT m.*, c.name as category_name FROM menus m LEFT JOIN categories c ON m.category_id = c.id";
        if (categoryId != null) {
            sql += " WHERE m.category_id = ?";
        }

        try (Connection conn = dataSource.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {

            if (categoryId != null) {
                pstmt.setInt(1, categoryId);
            }

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    list.add(mapRowToMenu(rs));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List<Menu> findAllByCategoryAndSearchQuery(Integer categoryId, String searchQuery) {
        List<Menu> list = new ArrayList<>();
        String sql = "SELECT m.*, c.name as category_name FROM menus m LEFT JOIN categories c ON m.category_id = c.id WHERE m.kor_name LIKE ?";
        if (categoryId != null) {
            sql += " AND m.category_id = ?";
        }

        try (Connection conn = dataSource.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, "%" + searchQuery + "%");
            if (categoryId != null) {
                pstmt.setInt(2, categoryId);
            }

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    list.add(mapRowToMenu(rs));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public Menu findById(Long id) {
        String sql = "SELECT m.*, c.name as category_name FROM menus m LEFT JOIN categories c ON m.category_id = c.id WHERE m.id = ?";

        try (Connection conn = dataSource.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setLong(1, id);

            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return mapRowToMenu(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    private Menu mapRowToMenu(ResultSet rs) throws SQLException {

        Menu menu = Menu.builder()
                .id(rs.getLong("id"))
                .korName(rs.getString("kor_name"))
                .engName(rs.getString("eng_name"))
                .description(rs.getString("description"))
                .price(rs.getString("price"))
                .categoryId(rs.getLong("category_id"))
                .isAvailable(rs.getBoolean("is_available"))
                .createdAt(
                        rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime() : null)
                .updatedAt(
                        rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at").toLocalDateTime() : null)
                .build();

        // category_name 컬럼이 있는 경우 Category 객체 생성
        try {
            String categoryName = rs.getString("category_name");
            if (categoryName != null) {
                menu.setCategory(Category.builder()
                        .id(String.valueOf(menu.getCategoryId()))
                        .name(categoryName)
                        .build());
            }
        } catch (SQLException e) {
            // category_name 컬럼이 없을 경우 무시 (일부 쿼리에서 base table만 조회할 수도 있으므로)
        }

        return menu;
    }
}
