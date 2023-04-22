<template>
    <div class="grid crud-view-only">
      <div class="col-12">
        <div class="card">
          <Toast />
          <Toolbar class="mb-4">
            <template #start>
              <div class="my-2">
                <h5>Currency is Active</h5>
                <InputSwitch  />
              </div>
            </template>
  
            <template #end>
              <Button
                label="Export"
                icon="pi pi-upload"
                class="p-button-help"
                @click="exportCSV($event)"
              />
            </template>
          </Toolbar>
          <DataTable
          ref="dt"
          :value="currencies"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :rowHover="true"
          v-model:filters="filters"
          filterDisplay="menu"
          :loading="loading1"
          responsiveLayout="scroll"
          >
            <template #header>
              <div
                class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
              >
                <h5 class="m-0">View Currencies</h5>
              </div>
            </template>
            <template #empty> No customers found. </template>
          <template #loading> Loading country data. Please wait. </template>
            <!-- <Column selection-mode="multiple" header-style="width: 3rem" /> -->
            <Column field="code" header="Code" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">Code</span>
                {{ slotProps.data.code }}
              </template>
              <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
            </Column>
            <Column field="is_active" header="Active" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">Active</span>
                {{ slotProps.data.isActive }}
              </template>
              <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
            </Column>
  
            <Column field="name" header="Name" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">Name</span>
                {{ slotProps.data.name }}
              </template>
              <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
            </Column>
            <Column field="currency_symbol" header="Symbol" :sortable="true">
              <template #body="slotProps">
                <span class="p-column-title">Name</span>
                {{ slotProps.data.currency_symbol }}
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { FilterMatchMode,FilterOperator } from 'primevue/api'
  import { ref } from 'vue'
  import { CurrencyMfn } from '~~/services/mfn'
  import { useApi } from '~/composables/useApi'
  
  const apiComp = useApi()
  const currencyService = new CurrencyMfn(apiComp)
  
  const currencies = ref(null)
  const loading1 = ref(true)
  const dt = ref(null)
  const filters = ref({
  })
  
  
  
  const allCurrencies = await currencyService.getAllCurrencies()
  
  const initFilters = () => {
    filters.value = {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    }
  }
  
  const clearFilter1 = () => {
    initFilters()
  }
  
  function exportCSV(opts: any) {
    console.log(`tried to export csv ${opts}`)
  }
  
  onBeforeMount(()=>{
      currencyService.getAllCurrencies().then((data)=>{
          currencies.value=data;
          loading1.value=false
      })
  
      initFilters()
  })
  </script>
  
  <style scoped></style>
  