<template>
    <div class="col-12">
      <div class="card">
        <h5>Country List</h5>
        <DataTable
          ref="dt"
          :value="countries"
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
            <div class="flex justify-content-between flex-column sm:flex-row">
              <Button
                type="button"
                icon="pi pi-filter-slash"
                label="Clear"
                class="p-button-outlined mb-2"
                @click="clearFilter1"
              />
              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>
            </div>
          </template>
          <template #empty> No customers found. </template>
          <template #loading> Loading country data. Please wait. </template>
          <Column field="name" header="Name" style="min-width: 12rem" sortable>
            <template #body="{ data }">
              {{ data.name }}
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
          <Column field="code" header="Code" style="min-width: 12rem" sortable>
            <template #body="{ data }">
              {{ data.code }}
            </template>
          </Column>
          <Column
            field="countryCurrencyCode"
            header="Currency Code"
            style="min-width: 12rem"
            sortable
          >
            <template #body="{ data }">
              {{ data.countryCurrencyCode }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { CountryMfn } from '~~/services/mfn'
  import { ref, onMounted, onBeforeMount } from 'vue'
  import { useApi } from '~/composables/useApi'
  import { FilterMatchMode, FilterOperator } from 'primevue/api'
  
  const apiComp = useApi()
  const countryService = new CountryMfn(apiComp)
  
  const loading1 = ref(true)
  const dt = ref(null)
  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  })
  const countries = ref(null)
  
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
  
  onBeforeMount(() => {
    countryService.getAllCountries().then((data) => {
      countries.value = data
      loading1.value = false
    })
  
    initFilters()
  })
  </script>
  
  <style scoped></style>
  