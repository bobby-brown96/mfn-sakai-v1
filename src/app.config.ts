import { defineAppConfig } from 'nuxt/app';
import { AppConfigInput } from 'nuxt/schema';

interface MyConfig extends AppConfigInput {
  title: string;
  description: string;
  baseURL: string;
}

export default defineAppConfig<MyConfig>({
  title: 'Sakai Nuxt',
  description: '',
  baseURL: '/'
});
