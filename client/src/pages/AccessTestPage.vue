<template>
  <div class="access-test container-fluid">
    <div class="row justify-content-center m-md-3 my-3">
      <div class="col-md-12 col-10 text-center">
        <h1 class="font-xxl mt-3">
          <u> Accessibility Test Page </u>
        </h1>
        <div class="row justify-content-around p-3 mb-3 shadow rounded bg-light">
          <div class="col-lg-2 col-sm-4 col-6 my-2">
            <button type="button" class="btn font-md w-100 btn-primary">
              Primary
            </button>
          </div>
          <div class="col-lg-2 col-sm-4 col-6 my-2">
            <button type="button" class="btn font-md w-100 btn-secondary">
              Secondary
            </button>
          </div>
          <div class="col-lg-2 col-sm-4 col-6 my-2">
            <button type="button" class="btn font-md w-100 btn-success">
              Success
            </button>
          </div>
          <div class="col-lg-2 col-sm-4 col-6 my-2">
            <button type="button" class="btn font-md w-100 btn-warning">
              Warning
            </button>
          </div>
          <div class="col-lg-2 col-sm-4 col-6 my-2">
            <button type="button" class="btn font-md w-100 btn-danger">
              Danger
            </button>
          </div>
          <div class="col-lg-2 col-sm-4 col-6 my-2">
            <button type="button" class="btn font-md w-100 btn-info">
              Info
            </button>
          </div>
        </div>
        <div class="row justify-content-around p-3 mb-3 shadow rounded bg-light">
          <div class="col-lg-2 col-sm-4 col-6 my-2">
            <button type="button" class="btn font-md w-100 btn-outline-primary">
              Primary
            </button>
          </div>
          <div class="col-lg-2 col-sm-4 col-6 my-2">
            <button type="button" class="btn font-md w-100 btn-outline-secondary" disabled>
              Secondary
            </button>
          </div>
          <div class="col-lg-2 col-sm-4 col-6 my-2">
            <button type="button" class="btn font-md w-100 btn-outline-success">
              Success
            </button>
          </div>
          <div class="col-lg-2 col-sm-4 col-6 my-2">
            <button type="button" class="btn font-md w-100 btn-outline-warning" disabled>
              Warning
            </button>
          </div>
          <div class="col-lg-2 col-sm-4 col-6 my-2">
            <button type="button" class="btn font-md w-100 btn-outline-danger">
              Danger
            </button>
          </div>
          <div class="col-lg-2 col-sm-4 col-6 my-2">
            <button type="button" class="btn font-md w-100 btn-outline-info">
              Info
            </button>
          </div>
        </div>
        <div class="row justify-content-around">
          <div class="col-12 shadow rounded bg-light p-3 mb-3">
            <h2 class="font-xl">
              <b><u>Extra Large Font</u></b><br>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, repudiandae.
            </h2>
            <h3 class="font-lg">
              <b><u>Large Font</u></b><br>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, repudiandae.
            </h3>
            <h4 class="font-md">
              <b><u>Medium Font</u></b><br>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, repudiandae.
            </h4>
            <h5 class="font-sm">
              <b><u>Small Font</u></b><br>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, repudiandae.
            </h5>
            <h6 class="font-xs">
              <b><u>Extra Small Font</u></b><br>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, repudiandae.
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccessTest'
}
</script>
