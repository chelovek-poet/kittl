FROM mcr.microsoft.com/playwright:v1.21.0-focal

# Copy project
COPY ./ .

WORKDIR /tests

# Install dependencies
RUN npm i
# Install browsers
RUN npx playwright install

# Run playwright test
CMD [ "npx", "playwright", "test" ]