/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiCheckbox, TYPES } from './checkbox';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

const checkboxRequiredProps = {
  id: 'id',
  onChange: () => {},
};

describe('EuiCheckbox', () => {
  shouldRenderCustomStyles(<EuiCheckbox {...checkboxRequiredProps} />, {
    skip: { style: true },
  });
  // styles get applied to the nested input, not to the className wrapper
  shouldRenderCustomStyles(<EuiCheckbox {...checkboxRequiredProps} />, {
    targetSelector: '.euiCheckbox__input',
    skip: { className: true, css: true },
  });
  shouldRenderCustomStyles(
    <EuiCheckbox {...checkboxRequiredProps} label="test" />,
    {
      childProps: ['labelProps'],
      skip: { parentTest: true },
    }
  );

  test('is rendered', () => {
    const component = render(
      <EuiCheckbox id="id" onChange={() => {}} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('check is rendered', () => {
      const component = render(
        <EuiCheckbox {...checkboxRequiredProps} checked />
      );

      expect(component).toMatchSnapshot();
    });

    test('label is rendered', () => {
      const component = render(
        <EuiCheckbox {...checkboxRequiredProps} label={<span>Label</span>} />
      );

      expect(component).toMatchSnapshot();
    });

    test('labelProps is rendered', () => {
      const component = render(
        <EuiCheckbox
          {...checkboxRequiredProps}
          label="Label"
          labelProps={requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });
    describe('type', () => {
      TYPES.forEach((value) => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiCheckbox {...checkboxRequiredProps} type={value} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('disabled', () => {
      test('disabled is rendered', () => {
        const component = render(
          <EuiCheckbox {...checkboxRequiredProps} disabled />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
