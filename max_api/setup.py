#!/usr/bin/env python
from __future__ import absolute_import, division, print_function, with_statement

from setuptools import setup, find_packages

module_name = 'max_api'

install_requires = []
with open('requirements.txt') as requirements_file:
    for requirement in requirements_file:
        if requirement:
            install_requires.append(requirement)

setup(name=module_name,
      version='1.0.0',
      author='Chris Lyon',
      author_email='flushot@gmail.com',
      description='MAX API',
      license='Public Domain',

      packages=find_packages('.'),
      package_dir={module_name: module_name},

      # Dependencies
      install_requires=install_requires,
      tests_require=[],

      # Tests
      test_suite='{}.test'.format(module_name)
      )
