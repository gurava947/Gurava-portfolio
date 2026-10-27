import unittest

from support import run_solution


class CaseConversionTest(unittest.TestCase):
    def test_case_01_helloworld(self):
        """helloWorld."""
        result = run_solution('case-conversion', 'helloWorld\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'hello_world\n')

    def test_case_02_mynameis(self):
        """myNameIs."""
        result = run_solution('case-conversion', 'myNameIs\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'my_name_is\n')


if __name__ == "__main__":
    unittest.main()
