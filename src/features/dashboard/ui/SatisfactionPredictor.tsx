import { SatisfactionPrediction } from 'entities/trip';
import { Smile, TrendingUp, Target, Lightbulb, Star, BarChart3 } from 'lucide-react';

interface SatisfactionPredictorProps {
  prediction: SatisfactionPrediction;
}

export default function SatisfactionPredictor({ prediction }: SatisfactionPredictorProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-green-600 dark:text-green-400';
    if (score >= 7) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 8.5) return 'bg-green-50 dark:bg-green-900/20';
    if (score >= 7) return 'bg-yellow-50 dark:bg-yellow-900/20';
    return 'bg-red-50 dark:bg-red-900/20';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 dark:text-green-400';
    if (confidence >= 0.6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Satisfaction Prediction</h3>
        <div className="flex items-center space-x-2">
          <Smile className="h-5 w-5 text-primary-500 dark:text-primary-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">AI-Powered</span>
        </div>
      </div>

      {/* Satisfaction Score */}
      <div className={`p-6 rounded-xl mb-6 ${getScoreBackground(prediction.score)}`}>
        <div className="text-center">
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(prediction.score)}`}>
            {prediction.score.toFixed(1)}/10
          </div>
          <div className="text-gray-600 dark:text-gray-400 mb-2">Predicted Satisfaction Score</div>
          <div className="flex items-center justify-center space-x-2">
            <BarChart3 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className={`text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
              {(prediction.confidence * 100).toFixed(0)}% Confidence
            </span>
          </div>
        </div>
      </div>

      {/* Satisfaction Factors */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
          <Target className="h-4 w-4" />
          <span>Key Factors</span>
        </h4>
        {prediction.factors.map((factor, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{factor.name}</span>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < factor.impact * 5 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{(factor.impact * 100).toFixed(0)}%</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{factor.description}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-primary-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${factor.impact * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
          <Lightbulb className="h-4 w-4 text-yellow-500" />
          <span>AI Recommendations</span>
        </h4>
        {prediction.recommendations.map((recommendation, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="p-1 bg-blue-100 dark:bg-blue-800 rounded-full mt-0.5">
              <TrendingUp className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm text-gray-700 dark:text-blue-300 flex-1">{recommendation}</p>
          </div>
        ))}
      </div>

      {/* Privacy Notice */}
      <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          🔒 Your data is processed locally and never used for AI training. Predictions are based on anonymized travel
          patterns only.
        </p>
      </div>
    </div>
  );
}
