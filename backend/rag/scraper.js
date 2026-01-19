import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function scrapePage(url) {
  const res = await fetch(url);
  const html = await res.text();

  const $ = cheerio.load(html);
  const text = $("body").text().replace(/\s+/g, " ").trim();

  return text.slice(0, 8000);
}
