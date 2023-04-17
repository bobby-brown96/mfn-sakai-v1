<template>
    <div class="grid crud-view-only">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template #start>
                        <div class="my-2">
                            <h5>Currency is Active</h5>
                            <InputSwitch v-model="switchValue" />
                        </div>
                    </template>

                    <template #end>

                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>
                <DataTable v-model:selection="allCurrencies" :value="allCurrencies" data-key="id" :paginator="true"
                    :rows="10" :filters="filters"
                    paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rows-per-page-options="[5, 10, 25]"
                    current-page-report-template="Showing {first} to {last} of {totalRecords} currencies"
                    responsive-layout="scroll">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">
                                View Currencies
                            </h5>

                        </div>
                    </template>
                    <!-- <Column selection-mode="multiple" header-style="width: 3rem" /> -->
                    <Column field="code" header="Code" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">Code</span>
                            {{ slotProps.data.code }}
                        </template>
                    </Column>
                    <Column field="is_active" header="Active" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">Active</span>
                            {{ slotProps.data.isActive }}
                        </template>
                    </Column>

                    <Column field="name" header="Name" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">Name</span>
                            {{ slotProps.data.name }}
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
import { FilterMatchMode } from 'primevue/api';
import { ref } from "vue";
import { CurrencyMfn } from '~~/services/mfn';
import { useApi } from '~/composables/useApi';

const apiComp = useApi()

const filters1=null;
const filters2={}

const switchValue = ref(false)
console.log(`switchValue: ${switchValue.value}`)
const currencyService = new CurrencyMfn(apiComp)

const allCurrencies = await currencyService.getAllCurrencies()
//console.log(`allCurrencies: ${JSON.stringify(allCurrencies)}`)

function exportCSV(opts: any) {
    console.log(`tried to export csv ${opts}`)
}
</script>

<style scoped></style>