export function prepareFacebookLink(link) {
  // eslint-disable-next-line no-useless-escape
  return link.match(/https?\:\/\/(?:www\.)?facebook\.com\/(\d+|[A-Za-z0-9\.]+)\/?/)[1];
}
