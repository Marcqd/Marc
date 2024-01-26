<template>
  <div>
    <div class="flex items-center mx-auto max-w-250px min-h-800px">
      <n-space vertical class="w-full" :size="30">
        <n-button strong secondary type="primary" size="large" block @click="showLogin = true">LOGIN</n-button>
        <n-button strong secondary type="info" size="large" block @click="showSignUp = true">Sign Up</n-button>
      </n-space>
    </div>
    <!-- start login-->
    <n-modal
        v-model:show="showLogin"
        class="max-w-500px"
        preset="card"
        title="LOGIN"
        size="huge"
        :bordered="false"
    >
      <n-form
          ref="loginFormRef"
          inline
          :label-width="80"
          :model="loginData"
      >
        <n-form-item label="Email" path="email" :rule="{required: true, trigger: ['input', 'blur']}">
          <n-input v-model:value="loginData.email" placeholder="please input email" />
        </n-form-item>
        <n-form-item label="Password" path="password" :rule="{required: true, trigger: ['input', 'blur']}">
          <n-input v-model:value="loginData.password" placeholder="please input password" />
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button" type="primary" @click="handleLogin">Login</n-button>
        </n-form-item>
      </n-form>
    </n-modal>
    <!-- end login-->
    <!-- start signUp-->
    <n-modal
        v-model:show="showSignUp"
        class="max-w-500px"
        preset="card"
        title="SIGN UP"
        size="huge"
        :bordered="false"
    >
      <n-form
          ref="signUpRef"
          inline
          :label-width="80"
          :model="signUpData"
      >
        <n-form-item label="Email" path="email" :rule="{required: true, trigger: ['input', 'blur']}">
          <n-input v-model:value="signUpData.email" placeholder="please input email" />
        </n-form-item>
        <n-form-item label="Password" path="password" :rule="{required: true, trigger: ['input', 'blur']}">
          <n-input v-model:value="signUpData.password" placeholder="please input password" />
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button" type="primary" @click="handleSignUp">SignUp</n-button>
        </n-form-item>
      </n-form>
    </n-modal>
    <!-- end signUp-->
  </div>

</template>

<script setup>
definePageMeta({
  layout: 'login'
})
useHead({
  title: 'login | SignUp',
})

  const loginFormRef = ref(null)
      , signUpRef = ref(null)
      , loginData = ref({})
      , signUpData = ref({})
      , showLogin = ref(false)
      , showSignUp = ref(false)
      , supabase = useSupabaseClient()
  ;

  /**
   * LOGIN SUBMIT
   * @param e
   */
  function handleLogin(e){
    e.preventDefault()
    loginFormRef.value?.validate(async (errors) => {
      if (!errors) {
        const {data,error} = await supabase.auth.signInWithPassword(loginData.value);
        if(error){
          useNuxtApp().$message.error(error.message);
        }else{
          useNuxtApp().$message.success('login success');
          await navigateTo('/')
        }
      } else {
        useNuxtApp().$message.error('validate error');
      }
    })
  }

/**
 * signUp Sumit
 * @param e
 */
function handleSignUp(e){
    e.preventDefault()
    signUpRef.value?.validate(async (errors) => {
      if (!errors) {
        const { data, error } = await supabase.auth.signUp(signUpData.value)
        if(error){
          useNuxtApp().$message.error(error.message);
        }
      } else {
        useNuxtApp().$message.error('validate error');
      }
    })
  }
</script>
