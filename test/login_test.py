import os
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# os.environ['PATH'] += r"C:/SeleniumDrivers"
driver = webdriver.Chrome()
driver.get("http://127.0.0.1:5500/root/pages/login.html")
# driver.implicitly_wait(30)
#maximize the window size  
driver.maximize_window()  
#delete the cookies  
driver.delete_all_cookies()  


username = driver.find_element(By.NAME, 'username')
password = driver.find_element(By.NAME, 'password')
submit = driver.find_element(By.ID, 'submit')
comment = driver.find_element(By.ID, 'comment')

# testing for username and password

# testing normal login

print("Testing normal login - Case 1")

username.send_keys('parth')
password.send_keys('123456789')
time.sleep(2)

submit.click()

if 'success' in comment.text.lower():
    print('Test case 1 passed')
else:
    print('Test case 1 failed')

# testing wrong username

username.clear()
password.clear()

print("Testing wrong username - Case 2")

username.send_keys('wrong_usr')
password.send_keys('123456789')
time.sleep(2)

submit.click()
if 'success' not in comment.text.lower():
    print('Test case 2 passed')
else:
    print('Test case 2 failed')


username.clear()
password.clear()

print("Testing wrong password - Case 3")

# testing wrong username

username.send_keys('parth')
password.send_keys('1234532436789')
time.sleep(2)

submit.click()
if 'success' not in comment.text.lower():
    print('Test case 3 passed')
else:
    print('Test case 3 failed')


username.clear()
password.clear()

# testing wrong username and password

print("Testing wrong username with space - Case 4")

username.send_keys('parth zarekar')
password.send_keys('asdfjaoiwer')
time.sleep(2)

submit.click()
if 'success' not in comment.text.lower():
    print('Test case 4 passed')
else:
    print('Test case 4 failed')


username.clear()
password.clear()

