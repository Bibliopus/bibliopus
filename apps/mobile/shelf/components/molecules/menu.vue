<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import Avatar from 'vue-boring-avatars';

withDefaults(
  defineProps<{
    seed: string
    variant?: 'beam' | 'bauhaus' | 'pixel' | 'ring' | 'marble' | 'sunset'
    size?: number
  }>(),
  {
    variant: 'marble',
    size: 40,
  },
);

const feedbackOpen = ref(false);
const { sendUserFeedback } = useFeedback();
const { getUser } = useUser();
const { data: user } = await getUser();

const links = ref([
  {
    name: 'Profile',
    href: `/users/${user.value?.id}`,
    icon: 'ph:user',
  },
  {
    name: 'Collections',
    href: '/collections',
    icon: 'ph:books',
  },
  {
    name: 'Messages',
    href: '/users/messages',
    icon: 'ph:chat-dots',
  },
  {
    name: 'Settings',
    href: '/',
    icon: 'ph:gear',
  },
]);

const actions = ref([
  {
    name: 'Give your feedback',
    callback: () => {
      feedbackOpen.value = true;
    },
    icon: 'ph:chat-dots',
  },
  {
    name: 'Sign out',
    href: '/auth/sign-out',
    icon: 'ph:sign-out',
  },
]);
</script>

<template>
  <Menu
    v-slot="{ close }"
    as="div"
    class="relative flex flex-col items-center justify-center"
  >
    <MenuButton>
      <Avatar
        :size="size"
        :variant="variant"
        :name="seed"
      />
    </MenuButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute origin-top-right right-0 top-full bg-dune-950 w-[200px] border border-dune-800 text-dune-50 rounded focus:outline-none mt-3 z-50"
      >
        <div class=" px-2 py-2 flex flex-col justify-start">
          <MenuItem
            v-for="link in links"
            :key="link.href"
            v-slot="{ active }"
          >
            <NuxtLink
              :to="link.href"
              class="text-left text-sm w-full py-[12px] px-2 rounded flex items-center gap-x-2 border border-transparent transition-colors"
              :class="{
                'bg-dune-900 border-dune-800': active,
              }"
              @mouseup="close"
            >
              <Icon
                :name="link.icon"
                size="20"
                class="text-dune-300"
              />
              {{ link.name }}
            </NuxtLink>
          </MenuItem>
        </div>
        <div class="border-t border-dune-800 px-2 py-2 flex flex-col justify-start">
          <MenuItem
            v-for="action in actions"
            v-slot="{ active }"
            :key="action.href"
          >
            <NuxtLink
              v-if="action.href"
              :to="action.href"
              class="text-left text-sm w-full py-[12px] px-2 rounded flex items-center gap-x-2 border border-transparent transition-colors"
              :class="{
                'bg-dune-900 border-dune-800': active,
              }"
              @mouseup="close"
            >
              <Icon
                :name="action.icon"
                size="20"
                class="text-dune-300"
              />
              {{ action.name }}
            </NuxtLink>
            <button
              v-else
              class="text-left text-sm w-full py-[12px] px-2 rounded flex items-center gap-x-2 border border-transparent transition-colors"
              :class="{
                'bg-dune-900 border-dune-800': active,
              }"
              @click="action.callback"
              @mouseup="close"
            >
              <Icon
                :name="action.icon"
                size="20"
                class="text-dune-300"
              />
              {{ action.name }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
  <MoleculesFeedback
    v-model:open="feedbackOpen"
    @submit="sendUserFeedback"
  />
</template>
