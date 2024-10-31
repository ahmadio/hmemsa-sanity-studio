import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
// Document Types
import {page} from './documents/page'
import {initiative} from './documents/initiative'
import {project} from './documents/project'
import {siteSettings} from './documents/siteSettings'

// Component Types
import {hero} from './components/hero'
import {stat} from './components/stat'

// Object Types
import {button} from './objects/button'
import {link} from './objects/link'
import {media} from './objects/media'
import {gallery} from './objects/gallery'
import {navigation} from './objects/navigation'
import {richText} from './objects/richText'
import {section} from './objects/section'
import {seo} from './objects/seo'
import {code} from './objects/code'

export const schemaTypes = [
  post,
  author,
  category,
  blockContent,
  seo,
  link,
  button,
  code,
  media,
  gallery,
  navigation,
  richText,
  section,
  siteSettings,
  stat,
  hero,
  initiative,
  project,
  page,
]
