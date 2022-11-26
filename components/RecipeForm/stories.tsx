import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import RecipeForm from './index';

export default {
  title: 'RecipeForm',
  component: RecipeForm,
} as ComponentMeta<typeof RecipeForm>;

const Template: ComponentStory<typeof RecipeForm> = (args) => <RecipeForm {...args} />;

export const Default = Template.bind({});
