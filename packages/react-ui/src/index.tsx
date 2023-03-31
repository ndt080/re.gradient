import DemoApp from '@/DemoApp';

export * from './components';

if (import.meta.env.DEV) {
  const React = await import('react');
  const ReactDOM = await import('react-dom/client');

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <DemoApp />
    </React.StrictMode>,
  );
}
