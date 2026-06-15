package com.fintech.fintech_dashboard.service;

import com.fintech.fintech_dashboard.dto.TransactionRequest;
import com.fintech.fintech_dashboard.dto.SummaryResponse;
import com.fintech.fintech_dashboard.model.Transaction;
import com.fintech.fintech_dashboard.model.Transaction.TransactionType;
import com.fintech.fintech_dashboard.model.User;
import com.fintech.fintech_dashboard.repository.TransactionRepository;
import com.fintech.fintech_dashboard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository repo;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Transaction addTransaction(TransactionRequest req) {
        User user = getCurrentUser();
        Transaction t = Transaction.builder()
                .amount(req.getAmount())
                .category(req.getCategory().trim())
                .type(req.getType())
                .date(req.getDate())
                .note(req.getNote())
                .user(user)
                .build();
        return repo.save(t);
    }

    public List<Transaction> getTransactions(
            String category, LocalDate startDate, LocalDate endDate) {

        User user = getCurrentUser();

        if (category != null && startDate != null && endDate != null) {
            return repo.findByUserAndCategoryAndDateBetween(user, category, startDate, endDate);
        } else if (category != null) {
            return repo.findByUserAndCategory(user, category);
        } else if (startDate != null && endDate != null) {
            return repo.findByUserAndDateBetween(user, startDate, endDate);
        } else {
            return repo.findByUser(user);
        }
    }

    public void deleteTransaction(Long id) {
        User user = getCurrentUser();
        Transaction t = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        if (!t.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        repo.deleteById(id);
    }

    public SummaryResponse getSummary() {
        User user = getCurrentUser();

        BigDecimal totalIncome  = repo.sumIncomeByUser(user);
        BigDecimal totalExpense = repo.sumExpenseByUser(user);
        BigDecimal netBalance   = totalIncome.subtract(totalExpense);
        String topCategory      = repo.topSpendingCategoryByUser(user);

        Map<String, BigDecimal> spendingByCategory = new LinkedHashMap<>();
        for (Object[] row : repo.spendingByCategoryByUser(user)) {
            spendingByCategory.put((String) row[0], (BigDecimal) row[1]);
        }

        String insight = generateInsight(totalIncome, totalExpense, topCategory);

        return SummaryResponse.builder()
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .netBalance(netBalance)
                .topSpendingCategory(topCategory)
                .spendingByCategory(spendingByCategory)
                .insight(insight)
                .build();
    }

    private String generateInsight(
            BigDecimal income, BigDecimal expense, String topCategory) {

        if (income.compareTo(BigDecimal.ZERO) == 0) {
            return "No income recorded yet. Start by adding your income transactions.";
        }

        double ratio = expense.doubleValue() / income.doubleValue();

        if (ratio > 0.9) {
            return "⚠️ You've spent over 90% of your income. Consider cutting back"
                    + (topCategory != null ? " especially on " + topCategory + "." : ".");
        } else if (ratio > 0.7) {
            return "📊 You're spending " + (int)(ratio * 100) + "% of your income."
                    + (topCategory != null ? " Your biggest category is " + topCategory + "." : "");
        } else if (ratio < 0.5) {
            return "✅ Great job! You're saving over 50% of your income. Keep it up!";
        } else {
            return "💡 You're spending " + (int)(ratio * 100) + "% of your income."
                    + " Try to keep expenses below 70% of income.";
        }
    }
}