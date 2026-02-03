export const questions = [
  {
    id: 'communication',
    question: 'How do you prefer to communicate in a relationship?',
    type: 'text',
    placeholder: 'Describe your ideal communication style...'
  },
  {
    id: 'lifestyle',
    question: 'Describe your ideal Saturday',
    type: 'text',
    placeholder: 'Morning hike, brunch with friends, or Netflix marathon?'
  },
  {
    id: 'values',
    question: 'What matters most to you in life? (Pick top 3)',
    type: 'multiselect',
    options: [
      'Career & Ambition',
      'Family',
      'Adventure & Travel',
      'Financial Security',
      'Creativity & Arts',
      'Health & Fitness',
      'Spirituality',
      'Social Impact',
      'Personal Growth',
      'Freedom & Independence'
    ]
  },
  {
    id: 'dealbreakers',
    question: 'What are your absolute dealbreakers?',
    type: 'text',
    placeholder: 'Be honest - what would make this not work?'
  },
  {
    id: 'kids',
    question: 'How do you feel about having kids?',
    type: 'select',
    options: [
      'Want kids someday',
      'Don\'t want kids',
      'Open to it',
      'Already have kids',
      'Not sure yet'
    ]
  },
  {
    id: 'energy',
    question: 'On the introvert-extrovert spectrum, where are you?',
    type: 'scale',
    min: 1,
    max: 5,
    labels: ['Very introverted', 'Very extroverted']
  },
  {
    id: 'conflict',
    question: 'When there\'s a disagreement, you usually:',
    type: 'select',
    options: [
      'Talk it out immediately',
      'Need time to think first',
      'Avoid conflict if possible',
      'Get emotional and passionate',
      'Stay logical and analytical'
    ]
  },
  {
    id: 'romance',
    question: 'What makes you feel loved?',
    type: 'text',
    placeholder: 'Acts of service, words of affirmation, physical touch, quality time, gifts...?'
  },
  {
    id: 'spontaneity',
    question: 'Spontaneous road trip vs planned vacation?',
    type: 'scale',
    min: 1,
    max: 5,
    labels: ['Always plan ahead', 'Always wing it']
  },
  {
    id: 'ambition',
    question: 'Work-life balance: where do you stand?',
    type: 'scale',
    min: 1,
    max: 5,
    labels: ['Work to live', 'Live to work']
  },
  {
    id: 'humor',
    question: 'Describe your sense of humor',
    type: 'text',
    placeholder: 'Sarcastic, punny, dark, silly, dry...?'
  },
  {
    id: 'firstdate',
    question: 'Ideal first date:',
    type: 'select',
    options: [
      'Coffee & walk',
      'Drinks at a bar',
      'Dinner',
      'Activity (bowling, museum, etc)',
      'Something unique/unexpected'
    ]
  },
  {
    id: 'dealmaker',
    question: 'What would make you say "wow, this person is perfect for me"?',
    type: 'text',
    placeholder: 'Paint me a picture...'
  }
];

export type QuestionnaireAnswers = Record<string, any>;
