import unittest

from support import run_solution


class CompositeNumberTest(unittest.TestCase):
    def test_case_01_n_12(self):
        """N = 12."""
        result = run_solution('composite-number', '12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'True\n')

    def test_case_02_n_4(self):
        """N = 4."""
        result = run_solution('composite-number', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')

    def test_case_03_n_7(self):
        """N = 7."""
        result = run_solution('composite-number', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')


if __name__ == "__main__":
    unittest.main()
