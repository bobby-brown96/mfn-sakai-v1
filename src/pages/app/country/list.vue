<template>
    <div class="col-12">
        <div class="card">
            <h5>Country List</h5>
            <DataTable v-model:filters="filters1" :value="country1" :paginator="true" class="p-datatable-gridlines"
                :rows="10" data-key="id" :row-hover="true" filter-display="menu" :loading="loading1" :filters="filters1"
                responsive-layout="scroll" :global-filter-fields="['name', 'code']">
                <template #header>
                    <div class="flex justify-content-between flex-column sm:flex-row">
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2"
                            @click="clearFilter1()" />
                        <span class="p-input-icon-left mb-2">
                            <i class="pi pi-search" />
                            <InputText v-model="filters1.global.value" placeholder="Keyword Search" style="width: 100%" />
                        </span>
                    </div>
                </template>
                <template #empty>
                    No customers found.
                </template>
                <template #loading>
                    Loading country data. Please wait.
                </template>
                <Column field="name" header="Name" style="min-width:12rem">
                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                            placeholder="Search by name" />
                    </template>
                </Column>
                <Column field="code" header="Code" style="min-width:12rem">
                    <template #body="{ data }">
                        {{ data.code }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                            placeholder="Search by code" />
                    </template>
                </Column>
                <Column field="countryCurrencyCode" header="Currency Code" style="min-width:12rem">
                    <template #body="{ data }">
                        {{ data.countryCurrencyCode }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                            placeholder="Search by code" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script  lang="ts">
import { CountryMfn } from '~~/services/mfn';
import { useApi } from '~/composables/useApi';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

export default {
    data() {
        return {
            country1: null,
            filters1: null,
            loading1: true,
        }
    },
    countryService: null,
    created() {
        const apiComp = useApi()
        this.countryService = new CountryMfn(apiComp)
        this.initFilters1()
    },
    mounted() {
        this.countryService.getAllCountries().then((data) => {
            this.country1 = data
            this.loading1 = false
        })
    },
    methods: {
        initFilters1() {
            this.filters1 = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'code': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            }
        },
        clearFilter1() {
      this.initFilters1();
    },
    }
}



</script>

<style scoped></style>