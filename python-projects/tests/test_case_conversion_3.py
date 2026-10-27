import unittest

from support import run_solution


class CaseConversion3Test(unittest.TestCase):
    def test_case_01_helloworld(self):
        """helloWorld."""
        result = run_solution('case-conversion-3', 'helloWorld\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'hello-world\n')

    def test_case_02_mynameis(self):
        """myNameIs."""
        result = run_solution('case-conversion-3', 'myNameIs\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'my-name-is\n')


if __name__ == "__main__":
    unittest.main()
