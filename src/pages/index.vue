<script lang="ts" setup>
import ProductService from '~~/services/ProductService';

const productService = new ProductService();

interface MenuComponent {
  toggle: (event?: MouseEvent) => void;
}

useHead({
  title: 'Dashboard'
});


const products = ref([]);
const items = ref([
  { label: 'Add New', icon: 'pi pi-fw pi-plus' },
  { label: 'Remove', icon: 'pi pi-fw pi-minus' }
]);
const lineData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Revenue',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: '#2f4860',
      borderColor: '#2f4860',
      tension: 0.4
    },
    {
      label: 'Sales',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: '#00bb7e',
      borderColor: '#00bb7e',
      tension: 0.4
    }
  ]
});

function formatCurrency(value: { toLocaleString: (arg0: string, arg1: { style: string; currency: string; }) => any; }) {
  // @ts-ignore
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}



onMounted(() => {
  productService.getProductsSmall().then((data) => {
    products.value = data;
  });
});
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Orders</span>
            <div class="text-900 font-medium text-xl">
              155
            </div>
          </div>
          <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem">
            <i class="pi pi-shopping-cart text-blue-500 text-xl" />
          </div>
        </div>
        <span class="text-green-500 font-medium">24 new </span>
        <span class="text-500">since last visit</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Revenue</span>
            <div class="text-900 font-medium text-xl">
              $2.100
            </div>
          </div>
          <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width:2.5rem;height:2.5rem">
            <i class="pi pi-map-marker text-orange-500 text-xl" />
          </div>
        </div>
        <span class="text-green-500 font-medium">%52+ </span>
        <span class="text-500">since last week</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Customers</span>
            <div class="text-900 font-medium text-xl">
              28441
            </div>
          </div>
          <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width:2.5rem;height:2.5rem">
            <i class="pi pi-inbox text-cyan-500 text-xl" />
          </div>
        </div>
        <span class="text-green-500 font-medium">520  </span>
        <span class="text-500">newly registered</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Comments</span>
            <div class="text-900 font-medium text-xl">
              152 Unread
            </div>
          </div>
          <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width:2.5rem;height:2.5rem">
            <i class="pi pi-comment text-purple-500 text-xl" />
          </div>
        </div>
        <span class="text-green-500 font-medium">85 </span>
        <span class="text-500">responded</span>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Recent Sales</h5>
        <DataTable :value="products" :rows="5" :paginator="true" responsive-layout="scroll">
          <Column style="width:15%">
            <template #header>
              Image
            </template>
            <template #body="slotProps">
              <img :src="`/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" width="50" class="shadow-2">
            </template>
          </Column>
          <Column field="name" header="Name" :sortable="true" style="width:35%" />
          <Column field="price" header="Price" :sortable="true" style="width:35%">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column style="width:15%">
            <template #header>
              View
            </template>
            <template #body>
              <Button icon="pi pi-search" type="button" class="p-button-text" />
            </template>
          </Column>
        </DataTable>
      </div>
    
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Sales Overview</h5>
        <Chart type="line" :data="lineData" />
      </div>
     
    </div>
  </div>
</template>
