import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Input from './index';

export default {
  title: 'Input',
  component: Input,
  args: {
    value: 'Hello world!',
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Hello world!',
};
