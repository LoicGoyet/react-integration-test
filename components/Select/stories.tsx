import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Select from './index';

export default {
  title: 'Select',
  component: Select,
  args: {
    value: 'hello',
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
  <Select {...args}>
    <option value="hello">hello</option>
    <option value="world!">world!</option>
  </Select>
);

export const Default = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Hello world!',
};
