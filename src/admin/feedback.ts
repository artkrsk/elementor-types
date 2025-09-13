/**
 * Admin Feedback Module Types
 * Types for admin feedback and survey functionality
 */

export interface FeedbackData {
  type: "bug" | "feature" | "improvement" | "other";
  message: string;
  rating?: number;
  email?: string;
  context?: any;
}

export interface FeedbackModule {
  // Feedback collection
  showFeedbackForm(): void;
  hideFeedbackForm(): void;
  submitFeedback(data: FeedbackData): Promise<boolean>;

  // Survey management
  showSurvey(surveyId: string): void;
  dismissSurvey(surveyId: string): void;
  isSurveyDismissed(surveyId: string): boolean;
}
