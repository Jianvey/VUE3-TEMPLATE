<template>
  <div
    id="LoginFrame"
    class="flex h-screen w-screen items-center justify-center bg-[rgb(232_232_232/20%)]"
  >
    <SnowfallBackdrop>
      <v-icon
        size="5rem"
        class="hover:text-primary absolute top-1 left-5 cursor-pointer text-white transition-colors duration-300"
        @click="router.replace('/')"
      >
        <LogoIcon />
      </v-icon>

      <div
        class="w-[min(22rem,90vw)] rounded-[2.5rem] border-[5px] border-white bg-[aliceblue] px-8.75 py-6.25 shadow-[0_30px_30px_-20px_rgba(69,214,187,0.2)]"
      >
        <h1
          class="flex items-center justify-center text-center indent-[0.5em] text-[2rem] font-bold tracking-[0.5em] text-[rgba(69,214,187,0.5)] select-none"
        >
          登录
        </h1>

        <div class="my-5 flex flex-col items-center gap-5">
          <input
            v-model="form.username"
            type="text"
            placeholder="邮箱"
            class="w-full rounded-[1.25rem] border-x-2 border-transparent bg-white px-5 py-3.75 caret-[rgba(69,214,187,0.5)] shadow-[0_10px_10px_-5px_rgba(69,214,187,0.2)] outline-none placeholder:font-bold placeholder:text-[#acb7c9] focus:shadow-[0_0_0_2px_rgba(69,214,187,0.25),0_23px_10px_-20px_rgba(69,214,187,0.45)]"
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="密码"
            @keyup.enter="login"
            class="w-full rounded-[1.25rem] border-x-2 border-transparent bg-white px-5 py-3.75 caret-[rgba(69,214,187,0.5)] shadow-[0_10px_10px_-5px_rgba(69,214,187,0.2)] outline-none placeholder:font-bold placeholder:text-[#acb7c9] focus:shadow-[0_0_0_2px_rgba(69,214,187,0.25),0_23px_10px_-20px_rgba(69,214,187,0.45)]"
          />
        </div>

        <button
          :disabled="loading"
          class="mb-5 h-11.25 w-full cursor-pointer rounded-[1.25rem] border-0 bg-[linear-gradient(to_right,rgba(69,214,187,0.3),rgba(166,193,238,0.7),rgba(69,214,187,0.3))] bg-size-[200%_100%] text-center leading-11.25 font-bold text-white shadow-[0_23px_10px_-20px_rgba(69,214,187,0.45)] transition-[background-position,transform,opacity] duration-300 select-none hover:bg-position-[100%_0] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          @click="login"
        >
          {{ loading ? "登录中..." : "登录" }}
        </button>
      </div>
    </SnowfallBackdrop>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

import LogoIcon from "@/assets/icons/logo.svg"
import SnowfallBackdrop from "@/components/SnowfallBackdrop.vue"
// import { _SignIn } from "@/server/api/auth"
import useStore from "@/store"
import { getFirstMenu } from "@/tools/permission"
import { snackbar } from "@/tools/snackbar"

const router = useRouter()
const { user } = useStore()
const loading = ref(false)
const form = reactive({
  username: localStorage.getItem("username") ?? "",
  password: "",
})

async function login() {
  if (!form.username || !form.password) return snackbar.warning("请输入用户名和密码")

  try {
    loading.value = true
    // const res = await _SignIn(form)

    //  --- MOCK ---
    const res = {
      data: {
        token: "xxx",
        user: { userId: "xxx", userName: "Admin" } as Model.User.Data,
        permissions: ["/home"],
      },
    }

    user.setToken(res.data.token)
    user.setUser(res.data.user)
    user.setPermission(res.data.permissions)

    const menu = getFirstMenu()
    if (menu) router.replace(menu.path)
    else snackbar.error("该账户未设置访问权限")
  } finally {
    loading.value = false
  }
}
</script>
