import * as React from 'react';
import {v4 as uuidv4} from 'uuid';
import {
  addItemInCollection,
  Collection,
  updateItemInCollection,
} from '../../utils/collection';

type IngredientForm = {
  id: string;
  name: string;
  quantity: number | '';
  unit: 'liter' | 'gram';
};

type StepForm = {
  id: string;
  instruction: string;
};

type RecipeForm = {
  name: string;
  description: string;
  ingredients: Collection<IngredientForm>;
  steps: Collection<StepForm>;
};

const emptyRecipeForm: RecipeForm = {
  name: '',
  description: '',
  ingredients: {byId: {}, allIds: []},
  steps: {byId: {}, allIds: []},
};

type Action =
  | {
      type: 'UPDATE_VALUES';
      payload: Partial<RecipeForm>;
    }
  | {
      type: 'ADD_INGREDIENT';
    }
  | {
      type: 'UPDATE_INGREDIENT';
      payload: Partial<IngredientForm> & {id: IngredientForm['id']};
    }
  | {
      type: 'ADD_STEP';
    }
  | {
      type: 'UPDATE_STEP';
      payload: Partial<StepForm> & {id: StepForm['id']};
    };

const reducer = (state: RecipeForm, action: Action): RecipeForm => {
  switch (action.type) {
    case 'UPDATE_VALUES': {
      return {
        ...state,
        ...action.payload,
      };
    }

    case 'ADD_INGREDIENT': {
      const newIngredient: IngredientForm = {
        id: uuidv4(),
        name: '',
        quantity: '',
        unit: 'gram',
      };

      return {
        ...state,
        ingredients: addItemInCollection(newIngredient, state.ingredients),
      };
    }

    case 'UPDATE_INGREDIENT': {
      return {
        ...state,
        ingredients: updateItemInCollection(action.payload, state.ingredients),
      };
    }

    case 'ADD_STEP': {
      const newStep = {
        id: uuidv4(),
        instruction: '',
      };

      return {
        ...state,
        steps: addItemInCollection(newStep, state.steps),
      };
    }

    case 'UPDATE_STEP': {
      return {
        ...state,
        steps: updateItemInCollection(action.payload, state.steps),
      };
    }

    default: {
      return state;
    }
  }
};

export const useForm = () => {
  const [state, dispatch] = React.useReducer(reducer, emptyRecipeForm);

  const handleInputChange = (name: keyof RecipeForm) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({type: 'UPDATE_VALUES', payload: {[name]: e.target.value}});
    };
  };

  const handleIngredientInputChange = (
    name: keyof IngredientForm,
    id: IngredientForm['id'],
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const shouldUseValueAsNumber =
        e.target.type === 'number' && !isNaN(e.target.valueAsNumber);

      dispatch({
        type: 'UPDATE_INGREDIENT',
        payload: {
          id,
          [name]: shouldUseValueAsNumber ? e.target.valueAsNumber : e.target.value,
        },
      });
    };
  };

  const handleIngredientSelectChange = (
    name: keyof IngredientForm,
    id: IngredientForm['id'],
  ) => {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch({
        type: 'UPDATE_INGREDIENT',
        payload: {
          id,
          [name]: e.target.value,
        },
      });
    };
  };

  const handleStepInputChange = (name: keyof StepForm, id: StepForm['id']) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'UPDATE_STEP',
        payload: {
          id,
          [name]: e.target.value,
        },
      });
    };
  };

  const addIngredient = () => {
    dispatch({type: 'ADD_INGREDIENT'});
  };

  const addStep = () => {
    dispatch({type: 'ADD_STEP'});
  };

  return {
    state,
    handleInputChange,
    addIngredient,
    addStep,
    handleIngredientInputChange,
    handleIngredientSelectChange,
    handleStepInputChange,
  };
};
