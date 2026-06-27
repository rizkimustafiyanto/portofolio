<script setup lang="ts">
import { searchablePages, theme } from '~/constans'

const router = useRouter()

const open = ref(false)
const keyword = ref('')

const filteredItems = computed(() => {
  const search = keyword.value.trim().toLowerCase()

  if (!search) return searchablePages

  return searchablePages.filter((item) =>
    `${item.title} ${item.description}`.toLowerCase().includes(search),
  )
})

async function navigate(path: string) {
  open.value = false
  keyword.value = ''

  await router.push(path)
}

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value = true
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div>
    <button
      :class="[
        'flex h-10 w-72 items-center gap-2 rounded-xl border border-border px-3 text-sm text-muted-foreground transition-colors hover:bg-muted',
        theme.colors.border,
      ]"
      @click="open = true"
    >
      <Icon name="lucide:search" class="h-4 w-4" />

      <span>Cari halaman...</span>

      <span class="ml-auto text-xs"> Ctrl + K </span>
    </button>

    <BaseModal v-model="open" title="Search">
      <div class="space-y-3">
        <input
          v-model="keyword"
          placeholder="Cari menu..."
          class="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none"
        />

        <div
          v-for="item in filteredItems"
          :key="item.path"
          class="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
          @click="navigate(item.path)"
        >
          <Icon :name="item.icon" class="h-5 w-5 shrink-0" />

          <div>
            <p class="font-medium">
              {{ item.title }}
            </p>

            <p class="text-xs text-muted-foreground">
              {{ item.description }}
            </p>
          </div>
        </div>

        <div
          v-if="filteredItems.length === 0"
          class="py-8 text-center text-sm text-muted-foreground"
        >
          Tidak ada hasil ditemukan
        </div>
      </div>
    </BaseModal>
  </div>
</template>
