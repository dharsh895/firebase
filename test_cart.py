from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()  # Ensure chromedriver is in PATH
driver.get("http://localhost:3000")
driver.maximize_window()

time.sleep(2)

 
driver.find_element(By.XPATH, "//input[@placeholder='Your Name']").send_keys("Ridhya")
driver.find_element(By.XPATH, "//input[@placeholder='Your Gmail']").send_keys("ridhya@gmail.com")

 
driver.find_element(By.XPATH, "//input[@placeholder='Item Name']").send_keys("Laptop")
driver.find_element(By.XPATH, "//input[@placeholder='Quantity']").send_keys("1")
driver.find_element(By.XPATH, "//input[@placeholder='Price']").send_keys("70000")
driver.find_element(By.XPATH, "//button[contains(text(),'Add Item')]").click()

 

time.sleep(2)

 
rows = driver.find_elements(By.XPATH, "//table/tbody/tr")
print(f"Total items in cart: {len(rows)}")

 
edit_button = driver.find_element(By.XPATH, "(//button[contains(text(),'Edit')])[1]")
edit_button.click()
time.sleep(1)

 
price_input = driver.find_element(By.XPATH, "//input[@placeholder='Price']")
price_input.clear()
price_input.send_keys("65000")
driver.find_element(By.XPATH, "//button[contains(text(),'Update Item')]").click()
print("Item updated successfully")

time.sleep(2)

 
delete_button = driver.find_element(By.XPATH, "(//button[contains(text(),'Delete')])[1]")
delete_button.click()
print("Item deleted successfully")

time.sleep(2)

driver.quit()
