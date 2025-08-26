import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// 样式导入
import './style.css'

// Font Awesome 图标
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faBars, 
  faTimes, 
  faSearch, 
  faMoon, 
  faSun,
  faHome,
  faUser,
  faEnvelope,
  faTag,
  faCalendar,
  faClock,
  faArrowLeft,
  faArrowRight,
  faChevronUp,
  faStar,
  faLink
} from '@fortawesome/free-solid-svg-icons'
import { 
  faGithub, 
  faTwitter, 
  faLinkedin,
  faWeibo
} from '@fortawesome/free-brands-svg-icons'

// 添加图标到库
library.add(
  faBars, 
  faTimes, 
  faSearch, 
  faMoon, 
  faSun,
  faHome,
  faUser,
  faEnvelope,
  faTag,
  faCalendar,
  faClock,
  faArrowLeft,
  faArrowRight,
  faChevronUp,
  faStar,
  faLink,
  faGithub, 
  faTwitter, 
  faLinkedin,
  faWeibo
)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')