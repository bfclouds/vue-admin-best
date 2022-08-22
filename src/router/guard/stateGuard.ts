import { PageEnum } from '@/enums/pageEnum'
import { removeTabChangeListener } from '@/logics/mitt/routeChange'
import { Router } from 'vue-router'

export function craeteStateGuard(router: Router) {
  router.afterEach((to) => {
    if (to.path === PageEnum.BASE_LOGIN) {
      removeTabChangeListener()
    }
  })
}
