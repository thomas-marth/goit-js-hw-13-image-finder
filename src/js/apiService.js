const BASE_URL = 'https://pixabay.com/api';
const key = '16819410-e96e43f9ec4d021c44a0ec2b8';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import { info } from '@pnotify/core';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${key}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.total === 0) {
          info({
            title:
              'По текущему запросу изображений не найдено, введите другой запрос',
          });
        } else {
          this.incrementPage();
          return data.hits;
        }
      })
      .catch(this.onFetchError);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  onFetchError(err) {
    error({
      title: 'Что-то пошло не так! Попробуйте снова',
    });
  }
}
