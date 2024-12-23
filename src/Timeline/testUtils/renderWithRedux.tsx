import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

export const renderWithRedux = (component: React.ReactNode, store: any) => {
  return render(<Provider store={store}>{component}</Provider>);
};
