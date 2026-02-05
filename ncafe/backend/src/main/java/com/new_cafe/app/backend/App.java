package com.new_cafe.app.backend;

import java.util.List;
import java.util.Scanner;
import java.sql.SQLException;

import com.new_cafe.app.backend.entity.Menu;
import com.new_cafe.app.backend.repository.MenuRepository;
import com.new_cafe.app.backend.repository.NewMenuRepository;

public class App {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {


        //java Relection, RTTI
        

        System.out.println("--- 메뉴 목록 (DB에서 가져옴) ---");

        // 사용자한테 검색어 입력 받아서
        String name = "";
        Scanner sc = new Scanner(System.in, "MS949");
        System.out.println("검색어 입력 : ");
        name = sc.nextLine();

        // 그걸 기준으로 데이터 퍼 와서
        MenuRepository menuRepository = new NewMenuRepository();
        List<Menu> menus = menuRepository.findAllByName(name);

        // 데이터 출력
        System.out.println(menus);

    }
}

// // API에게 이거 SQL 문장 실행해줘
// String sql = "SELECT * FROM menus2";

// // 0. 드라이버 로드
// Class.forName("org.postgresql.Driver");

// // 1. 인증
// Connection conn = DriverManager.getConnection(
// "jdbc:postgresql://aws-1-ap-south-1.pooler.supabase.com:6543/postgres",
// "postgres.iuvoemdinhozilthnpjh",
// "Dananeedstosleep");

// // 2. 실행
// Statement stmt = conn.createStatement();
// ResultSet rs = stmt.executeQuery(sql);

// // 3. 결과
// rs.next();
// System.out.println(rs.getString("kor_name"));