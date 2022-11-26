import * as React from 'react';
import {mapCollection} from '../../utils/collection';
import Input from '../Input';
import Select from '../Select';
import {useForm} from './useForm';

type Props = {
  className?: string;
};

const RecipeForm = ({className}: Props) => {
  const {
    state: values,
    handleInputChange,
    addIngredient,
    addStep,
    handleIngredientInputChange,
    handleIngredientSelectChange,
    handleStepInputChange,
  } = useForm();

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <Input label="Name" value={values.name} onChange={handleInputChange('name')} />
      <Input
        label="Description"
        value={values.description}
        onChange={handleInputChange('description')}
      />
      {mapCollection(
        (ingredient) => (
          <fieldset key={ingredient.id}>
            <Input
              label="Name"
              value={ingredient.name}
              onChange={handleIngredientInputChange('name', ingredient.id)}
            />

            <Input
              type="number"
              label="Quantity"
              value={ingredient.quantity}
              min={1}
              onChange={handleIngredientInputChange('quantity', ingredient.id)}
            />

            <Select
              label="Unit"
              value={ingredient.unit}
              onChange={handleIngredientSelectChange('unit', ingredient.id)}
            >
              <option value="liter">Liter</option>
              <option value="gram">Gram</option>
            </Select>
          </fieldset>
        ),
        values.ingredients,
      )}
      <button type="button" onClick={addIngredient}>
        Add Ingredient
      </button>

      {mapCollection(
        (step, index) => (
          <fieldset key={step.id}>
            <Input
              label={`Step #${index + 1}`}
              value={step.instruction}
              onChange={handleStepInputChange('instruction', step.id)}
            />
          </fieldset>
        ),
        values.steps,
      )}

      <button type="button" onClick={addStep}>
        Add Step
      </button>
    </form>
  );
};

export default RecipeForm;
