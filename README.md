# Steam Api
 
# Database Schema

```
CREATE TABLE Steam (
    type TINYTEXT,
    name TEXT,
    steam_appid INT NOT NULL PRIMARY KEY,
    required_age TINYINT,
    is_free TINYTEXT,
    controller_support TINYTEXT,
    dlc TEXT,
    detailed_description TEXT,
    about_the_game TEXT,
    short_description TEXT,
    fullgame TEXT,
    supported_languages TEXT,
    header_image TEXT,
    website TEXT,
    pc_requirements TEXT,
    mac_requirements TEXT,
    linux_requirements TEXT,
    legal_notice TEXT,
    drm_notice TEXT,
    ext_user_account_notice TEXT,
    developers TEXT,
    publishers TEXT,
    demos TEXT,
    price_overview TEXT,
    packages TEXT,
    package_groups TEXT,
    platforms TINYTEXT,
    metacritic TEXT,
    reviews TEXT,
    categories TEXT,
    genres TEXT,
    screenshots TEXT,
    movies TEXT,
    recommendations TEXT,
    achievements TEXT,
    release_date TEXT,
    support_info TEXT,
    background TEXT,
    content_descriptors TEXT
);
```
