import unittest

from support import run_solution


class FindElementInListTest(unittest.TestCase):
    def test_case_01_python(self):
        """python."""
        result = run_solution('find-element-in-list', 'python\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'True\n')

    def test_case_02_missing(self):
        """missing."""
        result = run_solution('find-element-in-list', 'fire\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')


if __name__ == "__main__":
    unittest.main()
