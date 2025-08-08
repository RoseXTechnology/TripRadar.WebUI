# Shared Layer

Общий слой содержит переиспользуемые компоненты, утилиты и конфигурации.

## Структура

### 📁 ui/

Переиспользуемые UI компоненты:

- `Button` - кнопки с различными вариантами
- `Input` - поля ввода
- `Modal` - модальные окна
- `Select` - выпадающие списки
- `VideoModal` - модальные окна для видео
- `Loading` - индикаторы загрузки
- `Badge` - значки/бейджи

### 📁 lib/

Утилиты и хуки:

#### hooks/

- `useApi` - хук для работы с API
- `useForm` - хук для работы с формами
- `useClickOutside` - хук для обработки кликов вне элемента
- `useLocalStorage` - хук для работы с localStorage

#### utils/

- `cn` - утилита для объединения CSS классов
- `format` - функции форматирования (дата, валюта, время)
- `validation` - функции валидации
- `storage` - утилиты для работы с localStorage

#### validation/

- `schemas` - схемы валидации для форм

### 📁 api/

Конфигурация API:

- `base` - базовый API клиент
- `types` - типы для API

### 📁 config/

Конфигурация приложения:

- `constants` - константы
- `env` - переменные окружения

## Использование

```typescript
// UI компоненты
import { Button, Modal, Loading } from 'shared/ui';

// Хуки и утилиты
import { useApi, useForm, cn, formatDate } from 'shared/lib';

// API
import { api } from 'shared/api';

// Конфигурация
import { API_ENDPOINTS } from 'shared/config';
```
