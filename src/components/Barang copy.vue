<template>
  <div class="row mt-4">
            <div class="col-sm-2">
                <label for="destination" class="form-label">Barang</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <div class="col-sm-1">
                <div class="mb-3">
                        <label for="1" class="form-label">1</label>
                        <input
                        type="text"
                        class="form-control"
                        id="1"
                        v-model="form.tumpukan_1"
                        />
                    </div>
            </div>
            <div class="col-sm-1">
                <div class="mb-3">
                        <label for="1" class="form-label">2</label>
                        <input
                        type="text"
                        class="form-control"
                        id="1"
                        v-model="form.tumpukan_2"
                        />
                    </div>
            </div>
            <div class="col-sm-1">
                <div class="mb-3">
                        <label for="3" class="form-label">3</label>
                        <input
                        type="text"
                        class="form-control"
                        id="3"
                        v-model="form.tumpukan_3"
                        />
                    </div>
            </div>
            <div class="col-sm-1">
                <div class="mb-3">
                        <label for="4" class="form-label">4</label>
                        <input
                        type="text"
                        class="form-control"
                        id="4"
                        v-model="form.tumpukan_4"
                        />
                    </div>
            </div>
            <div class="col-sm-1">
                <div class="mb-3">
                        <label for="5" class="form-label">5</label>
                        <input
                        type="text"
                        class="form-control"
                        id="5"
                        v-model="form.tumpukan_5"
                        />
                    </div>
            </div>
            <div class="col-sm-1">
                <div class="mb-3">
                        <label for="6" class="form-label">6</label>
                        <input
                        type="text"
                        class="form-control"
                        id="6"
                        v-model="form.tumpukan_6"
                        />
                    </div>
            </div>
            <div class="col-sm-1">
                <div class="mb-3">
                        <label for="7" class="form-label">7</label>
                        <input
                        type="text"
                        class="form-control"
                        id="7"
                        v-model="form.tumpukan_7"
                        />
                    </div>
            </div>
            <div class="col-sm-1">
                <div class="mb-3">
                        <label for="8" class="form-label">8</label>
                        <input
                        type="text"
                        class="form-control"
                        id="8"
                        v-model="form.tumpukan_8"
                        />
                    </div>
            </div>
            <div class="col-sm-2">
                <div class="mb-3">
                        <label for="total" class="form-label">Total</label>
                        <input
                        type="text"
                        class="form-control"
                        id="total"
                        v-model="form.total"
                        />
                    </div>
            </div>
        </div>
</template>

<script>
export default {

}
</script>

<style>

</style>