# Steam Api
 
# Database Schema

```
CREATE TABLE `Steam` (
  `type` text,
  `name` text,
  `steam_appid` int NOT NULL,
  `required_age` text,
  `is_free` text,
  `controller_support` text,
  `dlc` text,
  `detailed_description` text,
  `about_the_game` text,
  `short_description` text,
  `fullgame` text,
  `supported_languages` text,
  `header_image` text,
  `website` text,
  `pc_requirements` text,
  `mac_requirements` text,
  `linux_requirements` text,
  `legal_notice` text,
  `drm_notice` text,
  `ext_user_account_notice` text,
  `developers` text,
  `publishers` text,
  `demos` text,
  `price_overview` text,
  `packages` text,
  `package_groups` text,
  `platforms` text,
  `metacritic` text,
  `reviews` text,
  `categories` text,
  `genres` text,
  `screenshots` text,
  `movies` text,
  `recommendations` text,
  `achievements` text,
  `release_date` text,
  `support_info` text,
  `background` text,
  `content_descriptors` text,
  PRIMARY KEY (`steam_appid`)
)
```
