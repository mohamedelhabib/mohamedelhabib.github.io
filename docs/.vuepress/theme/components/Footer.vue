<template>
  <footer class="footer">
    <ul v-if="contact" class="sidebar-social">
      <li v-for="item in contact" :key="item.iconComponent" class="contact-item">
        <a :href="item.link" :title="item.type">
          <component :is="item.iconComponent"></component>
          {{ item.type }}
        </a>
      </li>
    </ul>

    <div v-if="copyright" class="copyright">{{ copyright }}</div>
  </footer>
</template>

<script>
import {
  CodepenIcon,
  CodesandboxIcon,
  FacebookIcon,
  GithubIcon,
  GitlabIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MessageSquareIcon,
  MusicIcon,
  PhoneIcon,
  TwitterIcon,
  VideoIcon,
  YoutubeIcon
} from "vue-feather-icons";

export default {
  components: {
    CodepenIcon,
    CodesandboxIcon,
    FacebookIcon,
    GithubIcon,
    GitlabIcon,
    GlobeIcon,
    InstagramIcon,
    LinkedinIcon,
    MailIcon,
    MessageSquareIcon,
    MusicIcon,
    PhoneIcon,
    TwitterIcon,
    VideoIcon,
    YoutubeIcon
  },

  computed: {
    contact() {
      return (
        (this.$themeConfig.footer && this.$themeConfig.footer.contact) ||
        []
      )
        .map(({ type, link }) => {
          return {
            iconComponent: this.getIconComponentName(type),
            link,
            type
          };
        })
        .filter(({ iconComponent }) => iconComponent);
    },

    copyright() {
      return (
        (this.$themeConfig.footer && this.$themeConfig.footer.copyright) || []
      );
    }
  },

  methods: {
    getIconComponentName(contactType) {
      switch (contactType) {
        case "codepen":
          return "CodepenIcon";
        case "codesandbox":
          return "CodesandboxIcon";
        case "facebook":
          return "FacebookIcon";
        case "github":
          return "GithubIcon";
        case "gitlab":
          return "GitlabIcon";
        case "instagram":
          return "InstagramIcon";
        case "linkedin":
          return "LinkedinIcon";
        case "mail":
          return "MailIcon";
        case "messenger":
          return "MessageSquareIcon";
        case "music":
          return "MusicIcon";
        case "phone":
          return "PhoneIcon";
        case "twitter":
          return "TwitterIcon";
        case "video":
          return "VideoIcon";
        case "web":
          return "GlobeIcon";
        case "youtube":
          return "YoutubeIcon";
        default:
          return "";
      }
    }
  }
};
</script>

<style scoped>
.sidebar-social {
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
  width: 10em;
}
.sidebar-social::after {
  content: "";
  display: table;
  clear: both;
}
.sidebar-social {
  list-style: none;
  padding-left: 0;
}
.sidebar-social > li {
  float: left;
}
.sidebar-social > li > a {
  display: inline-block;
  text-align: center;
  font-size: 0rem;
  width: 3rem;
  height: 2rem;
  padding: 0;
}
.sidebar-social > li > a:hover {
  color: #f00;
}
.copyright {
  font-size: 0.7em;
  padding-top: 1em;
  margin-left: auto;
  margin-right: auto;
  border-top-color: #eee;
  width: 15em;
  border-top-width: 1px;
  border-top-style: solid;
}
</style>
