import { useQuiz } from '../context/QuizContext';
import toast from 'react-hot-toast';

export function useQuizActions() {
  const { state, dispatch, actions } = useQuiz();

  const handleAnswerSelect = (questionId, answer, isCorrect, question) => {
    dispatch({
      type: actions.SELECT_ANSWER,
      payload: { questionId, answer }
    });

    if (isCorrect) {
      toast.success('✅ Correct! Well done!', {
        duration: 1500,
        position: 'top-center',
        style: {
          background: '#22c55e',
          color: 'white',
          fontWeight: 'bold',
        },
      });
    } else {
      toast.error(`❌ Incorrect! The answer is ${question.correctAnswer}`, {
        duration: 2000,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: 'white',
          fontWeight: 'bold',
        },
      });
    }
  };

  const handleNext = () => {
    dispatch({ type: actions.NEXT_QUESTION });
  };

  const handlePrevious = () => {
    dispatch({ type: actions.PREVIOUS_QUESTION });
  };

  const handleRestart = () => {
    dispatch({ type: actions.RESTART_QUIZ });
    toast.success('Quiz restarted!');
  };

  return {
    handleAnswerSelect,
    handleNext,
    handlePrevious,
    handleRestart,
    state,
  };
}