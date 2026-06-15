package com.fintech.fintech_dashboard.repository;


import com.fintech.fintech_dashboard.model.Transaction;
import com.fintech.fintech_dashboard.model.Transaction.TransactionType;
import com.fintech.fintech_dashboard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUser(User user);

    List<Transaction> findByUserAndCategory(User user, String category);

    List<Transaction> findByUserAndDateBetween(User user, LocalDate startDate, LocalDate endDate);

    List<Transaction> findByUserAndCategoryAndDateBetween(
            User user, String category, LocalDate startDate, LocalDate endDate);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.user = :user AND t.type = 'INCOME'")
    BigDecimal sumIncomeByUser(User user);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.user = :user AND t.type = 'EXPENSE'")
    BigDecimal sumExpenseByUser(User user);

    @Query("SELECT t.category, SUM(t.amount) FROM Transaction t WHERE t.user = :user AND t.type = 'EXPENSE' GROUP BY t.category ORDER BY SUM(t.amount) DESC")
    List<Object[]> spendingByCategoryByUser(User user);

    @Query("SELECT t.category FROM Transaction t WHERE t.user = :user AND t.type = 'EXPENSE' GROUP BY t.category ORDER BY SUM(t.amount) DESC LIMIT 1")
    String topSpendingCategoryByUser(User user);
}