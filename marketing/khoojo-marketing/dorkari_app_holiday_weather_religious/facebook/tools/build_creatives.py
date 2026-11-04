"""Renders the Facebook ad creatives from ad_creatives.html.

    python marketing/facebook/tools/build_creatives.py

Needs Python 3 with Pillow, plus Google Chrome or Microsoft Edge (headless).
Set CHROME=<path> to use a different Chromium-based browser.
Output: marketing/facebook/creatives/*.png (24-bit PNG, no transparency).
"""
import os
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

TOOLS = Path(__file__).resolve().parent
OUT = TOOLS.parent / 'creatives'

CREATIVES = [
    ('square', 'fb_square_1080x1080.png', (1080, 1080)),
    ('feed', 'fb_feed_1080x1350.png', (1080, 1350)),
    ('story', 'fb_story_1080x1920.png', (1080, 1920)),
    ('link', 'fb_link_1200x628.png', (1200, 628)),
]

BROWSERS = [
    os.environ.get('CHROME', ''),
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
]


def main():
    browser = next((b for b in BROWSERS if b and Path(b).exists()), None)
    if browser is None:
        sys.exit('No Chrome/Edge found; set CHROME to a Chromium-based browser.')
    OUT.mkdir(parents=True, exist_ok=True)
    for variant, name, size in CREATIVES:
        raw = Path(tempfile.gettempdir()) / f'dorkari_ad_{variant}.png'
        raw.unlink(missing_ok=True)
        subprocess.run([
            browser, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
            f'--window-size={size[0]},{size[1]}', '--virtual-time-budget=4000', '--allow-file-access-from-files',
            f'--screenshot={raw}', (TOOLS / 'ad_creatives.html').as_uri() + f'#v={variant}',
        ], check=True, capture_output=True)
        img = Image.open(raw).convert('RGB')
        if img.size != size:
            sys.exit(f'{variant}: rendered {img.size}, expected {size}')
        img.save(OUT / name)
        print('wrote', OUT / name)


if __name__ == '__main__':
    main()
