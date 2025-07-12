import React from 'react';
import { Panel, Group, Placeholder } from '@vkontakte/vkui';
import Header from '../components/Header';

const FavoritesPage: React.FC = () => (
  <Panel>
    <Header />
    <Group>
      <Placeholder>Здесь будут ваши избранные фильмы</Placeholder>
    </Group>
  </Panel>
);

export default FavoritesPage;