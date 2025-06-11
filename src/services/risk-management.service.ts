import { Injectable } from '@angular/core';

export interface RiskFactors {
    capitalGainsTaxRate: number; // Canada: 50% of gains taxable
    brokerageCommission: number;
    exchangeFees: number;
    currencyConversionFees: number;
}

export interface TradeRisk {
    maxLoss: number;
    probabilityOfLoss: number;
    expectedValue: number;
    sharpeRatio: number;
    riskOfRuin: number;
    recommendation: string;
}

@Injectable({
    providedIn: 'root'
})
export class RiskManagementService {

    private canadianRiskFactors: RiskFactors = {
        capitalGainsTaxRate: 0.50,
        brokerageCommission: 0.0035,
        exchangeFees: 0.0001,
        currencyConversionFees: 0.015
    };

    calculateTradeRisk(
        entryPrice: number, 
        exitPrice: number, 
        quantity: number, 
        successProbability: number
    ): TradeRisk {
        const grossProfit = (exitPrice - entryPrice) * quantity;
        const totalFees = this.calculateTotalFees(entryPrice * quantity);
        const taxImpact = grossProfit > 0 ? grossProfit * 0.125 : 0; // 25% marginal * 50% inclusion
        
        const netProfit = grossProfit - totalFees - taxImpact;
        const maxLoss = Math.abs(entryPrice * quantity * 0.03); // 3% stop loss
        const expectedValue = (successProbability * netProfit) + ((1 - successProbability) * (-maxLoss));
        
        const sharpeRatio = expectedValue / (maxLoss * 0.2);
        const riskOfRuin = this.calculateRiskOfRuin(successProbability, netProfit, maxLoss);
        
        return {
            maxLoss,
            probabilityOfLoss: 1 - successProbability,
            expectedValue,
            sharpeRatio,
            riskOfRuin,
            recommendation: this.generateRecommendation(expectedValue, sharpeRatio, riskOfRuin)
        };
    }

    private calculateTotalFees(tradeValue: number): number {
        const commission = tradeValue * this.canadianRiskFactors.brokerageCommission;
        const exchangeFee = tradeValue * this.canadianRiskFactors.exchangeFees;
        const currencyFee = tradeValue * this.canadianRiskFactors.currencyConversionFees;
        
        return commission + exchangeFee + currencyFee;
    }

    private calculateRiskOfRuin(successProbability: number, profit: number, loss: number): number {
        // Simplified Kelly Criterion-based risk of ruin calculation
        const kelly = (successProbability * profit - (1 - successProbability) * loss) / profit;
        return Math.max(0, 1 - kelly);
    }

    private generateRecommendation(expectedValue: number, sharpeRatio: number, riskOfRuin: number): string {
        if (expectedValue <= 0) {
            return "❌ AVOID - Negative expected value";
        }
        
        if (riskOfRuin > 0.05) {
            return "⚠️ HIGH RISK - Consider reducing position size";
        }
        
        if (sharpeRatio > 2.0) {
            return "✅ EXCELLENT - Strong risk-adjusted returns";
        }
        
        if (sharpeRatio > 1.0) {
            return "✅ GOOD - Positive risk-adjusted returns";
        }
        
        return "⚠️ MARGINAL - Low risk-adjusted returns";
    }

    shouldExecuteTrade(risk: TradeRisk, maxAcceptableRisk: number = 0.02): boolean {
        return risk.expectedValue > 0 && 
               risk.riskOfRuin < maxAcceptableRisk && 
               risk.sharpeRatio > 1.0;
    }

    getPortfolioRiskMetrics(currentBalance: number, positions: any[] = []): any {
        const totalExposure = positions.reduce((sum, pos) => sum + (pos.quantity * pos.price), 0);
        const exposureRatio = totalExposure / currentBalance;
        
        return {
            currentBalance,
            totalExposure,
            exposureRatio,
            availableCash: currentBalance - totalExposure,
            riskLevel: this.assessRiskLevel(exposureRatio),
            recommendation: this.getPortfolioRecommendation(exposureRatio)
        };
    }

    private assessRiskLevel(exposureRatio: number): string {
        if (exposureRatio < 0.5) return 'CONSERVATIVE';
        if (exposureRatio < 0.8) return 'MODERATE';
        if (exposureRatio < 0.95) return 'AGGRESSIVE';
        return 'EXTREME';
    }

    private getPortfolioRecommendation(exposureRatio: number): string {
        if (exposureRatio < 0.3) {
            return "Consider increasing position sizes for better returns";
        }
        if (exposureRatio < 0.7) {
            return "Good risk balance - maintain current strategy";
        }
        if (exposureRatio < 0.9) {
            return "High exposure - be cautious with new positions";
        }
        return "Dangerous exposure level - consider reducing positions";
    }
}
