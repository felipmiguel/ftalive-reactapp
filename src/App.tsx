import React, { useEffect, useState } from 'react';
import { Stack, Text, FontWeights, IStackTokens, IStackStyles, ITextStyles, DetailsList, DetailsListLayoutMode } from '@fluentui/react';
import logo from './logo.svg';
import './App.css';
import { WeatherForecast } from './model/WeatherForecast';

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: '960px',
    margin: '0 auto',
    textAlign: 'center',
    color: '#605e5c',
  },
};

export const App: React.FunctionComponent = () => {

  const [items, setItems] = useState<WeatherForecast[]>();

  const _columns = [
    { key: 'date', name: 'date', fieldName: 'date', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'temperatureC', name: 'temperatureC', fieldName: 'temperatureC', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'temperatureF', name: 'temperatureF', fieldName: 'temperatureF', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'summary', name: 'summary', fieldName: 'summary', minWidth: 100, maxWidth: 200, isResizable: true },
  ];

  useEffect(() => {
    if (!items) {
      fetch('https://localhost:49153/weatherforecast')
        .then(response => response.json())
        .then(data => setItems(data));
    }
  }, [items]);

  return (
    <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
      <img className="App-logo" src={logo} alt="logo" />
      <Text variant="xxLarge" styles={boldStyle}>
        Welcome to your Ultimate Weather app!
      </Text>
      <Text variant="xxLarge" styles={boldStyle}>
        What weather do you want today?

      </Text>

      <Stack horizontal tokens={stackTokens} horizontalAlign="center">
        <DetailsList
          items={items ?? []}
          columns={_columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"
        />


      </Stack>

    </Stack>
  );
};
