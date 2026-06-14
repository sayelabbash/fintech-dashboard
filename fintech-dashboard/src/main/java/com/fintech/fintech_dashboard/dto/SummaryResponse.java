package com.fintech.fintech_dashboard.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SummaryResponse {

    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private BigDecimal netBalance;
    private String topSpendingCategory;
    private Map<String, BigDecimal> spendingByCategory;
    private String insight;
}