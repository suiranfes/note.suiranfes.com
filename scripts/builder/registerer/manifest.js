module.exports = (site) => {
    let icons = []
    for (let i = 0 ; i < site.icons.length ; i++) {
        let icon = site.icons[i]
        icon.src = site.url.path + icon.path
        icons.push(icon)
    }
    return require('extend')(true, site.manifest, {
        'name': site.name,
        'short_name': site.short_name,
        icons,
        start_url : site.url.path + '/',
        'theme_color': site.theme_color.primary,
        'background_color': site.theme_color.secondary
    })
}