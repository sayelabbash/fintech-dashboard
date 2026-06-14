package com.fintech.fintech_dashboard.repository;


import com.fintech.fintech_dashboard.model.Transaction;
import com.fintech.fintech_dashboard.model.Transaction.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByCategory(String category);

    List<Transaction> findByDateBetween(LocalDate startDate, LocalDate endDate);

    List<Transaction> findByType(TransactionType type);

    List<Transaction> findByCategoryAndDateBetween(
            String category, LocalDate startDate, LocalDate endDate
    );


    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.type = 'INCOME'")
    BigDecimal sumIncome();


    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.type = 'EXPENSE'")
    BigDecimal sumExpense();

    @Query("SELECT t.category, SUM(t.amount) FROM Transaction t WHERE t.type = 'EXPENSE' GROUP BY t.category ORDER BY SUM(t.amount) DESC")
    List<Object[]> spendingByCategory();

    @Query("SELECT t.category FROM Transaction t WHERE t.type = 'EXPENSE' GROUP BY t.category ORDER BY SUM(t.amount) DESC LIMIT 1")
    String topSpendingCategory();
}
